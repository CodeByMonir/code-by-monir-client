'use client';

import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'checklist_app_cache_v1';
const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

export default function ChecklistApp() {
    // Navigation: 'create' | 'last' | 'all'
    const [activeTab, setActiveTab] = useState('create');
    const [showCalc, setShowCalc] = useState(false);

    // Data state
    const [lists, setLists] = useState([]);
    const [currentList, setCurrentList] = useState({
        id: null,
        title: '',
        items: [],
        date: ''
    });

    // Modals
    const [previewList, setPreviewList] = useState(null);
    const [showConfirmClearAll, setShowConfirmClearAll] = useState(false);

    // Service Worker Registration for Offline Support
    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js', { scope: '/checkList' })
                .then((registration) => {
                    console.log('Service Worker scoped to /checkList:', registration.scope);
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        }
    }, []);

    // Load from local cache on mount (Offline support)
    useEffect(() => {
        try {
            const cached = localStorage.getItem(STORAGE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                const now = Date.now();
                if (now - parsed.timestamp < TWO_WEEKS_MS) {
                    setLists(parsed.lists || []);
                    if (parsed.lists && parsed.lists.length > 0) {
                        setCurrentList(parsed.lists[0]);
                    }
                } else {
                    localStorage.removeItem(STORAGE_KEY);
                }
            }
        } catch (e) {
            console.error('Failed to load cache:', e);
        }
    }, []);

    // Save to local cache with timestamp
    const persistLists = (updatedLists) => {
        setLists(updatedLists);
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    timestamp: Date.now(),
                    lists: updatedLists
                })
            );
        } catch (e) {
            console.error('Failed to save to cache:', e);
        }
    };

    // Date and Day Display
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    // Handlers for List Creation & Manipulation
    const handleNewList = () => {
        const freshList = {
            id: Date.now(),
            title: '',
            items: [],
            date: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })
        };
        setCurrentList(freshList);
        setActiveTab('create');
    };

    const handleShowLastList = () => {
        if (lists.length > 0) {
            setCurrentList(lists[0]);
            setActiveTab('last');
        } else {
            handleNewList();
        }
    };

    const addItemToCurrentList = () => {
        const newItem = {
            id: Date.now() + Math.random(),
            checked: false,
            title: '',
            price: '',
            quantity: 1,
            unit: 'Piece'
        };
        setCurrentList((prev) => ({
            ...prev,
            items: [...prev.items, newItem]
        }));
    };

    const updateItem = (itemId, field, value) => {
        setCurrentList((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item
            )
        }));
    };

    const deleteItem = (itemId) => {
        setCurrentList((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.id !== itemId)
        }));
    };

    const handleSaveCurrentList = () => {
        if (!currentList.title.trim()) {
            alert('Please enter a list title before saving.');
            return;
        }
        const targetId = currentList.id || Date.now();
        const preparedList = {
            ...currentList,
            id: targetId,
            date:
                currentList.date ||
                new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })
        };

        const existingIndex = lists.findIndex((l) => l.id === targetId);
        let updated;
        if (existingIndex >= 0) {
            updated = [...lists];
            updated[existingIndex] = preparedList;
        } else {
            updated = [preparedList, ...lists];
        }

        persistLists(updated);
        setCurrentList(preparedList);
        alert('List saved successfully!');
    };

    const handleClearCurrentList = () => {
        setCurrentList((prev) => ({
            ...prev,
            title: '',
            items: []
        }));
    };

    const handleDeleteSingleList = (id, e) => {
        e?.stopPropagation();
        const updated = lists.filter((l) => l.id !== id);
        persistLists(updated);
        if (currentList.id === id) {
            handleNewList();
        }
        if (previewList?.id === id) {
            setPreviewList(null);
        }
    };

    const handleClearAllLists = () => {
        persistLists([]);
        handleNewList();
        setShowConfirmClearAll(false);
    };

    // Grand Total of checked items only
    const grandTotal = currentList.items.reduce((acc, item) => {
        if (item.checked) {
            const p = parseFloat(item.price) || 0;
            const q = parseFloat(item.quantity) || 0;
            return acc + p * q;
        }
        return acc;
    }, 0);

    return (
        <div className="my-20 min-h-screen w-full max-w-md mx-auto bg-transparent p-2 text-[13px] text-gray-800 dark:text-gray-100 select-none">
            {/* Date & Day Bar */}
            <div className="flex justify-between items-center px-3 py-1.5 mb-2 rounded-xl backdrop-blur-md bg-white/40 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-sm">
                <span className="font-semibold text-[13px] tracking-wide">{dateString}</span>
                <span className="text-[11px] opacity-70">Offline Ready</span>
            </div>

            {/* Navigation Toolbar */}
            <div className="grid grid-cols-4 gap-1.5 mb-3">
                <button
                    onClick={handleShowLastList}
                    className={`py-1.5 px-2 rounded-lg border border-white/30 dark:border-white/10 text-center font-medium backdrop-blur-md transition-all active:scale-95 ${activeTab === 'last'
                            ? 'bg-blue-600/80 text-white border-blue-500'
                            : 'bg-white/40 dark:bg-zinc-800/40'
                        }`}
                >
                    List
                </button>
                <button
                    onClick={handleNewList}
                    className={`py-1.5 px-2 rounded-lg border border-white/30 dark:border-white/10 text-center font-medium backdrop-blur-md transition-all active:scale-95 ${activeTab === 'create'
                            ? 'bg-blue-600/80 text-white border-blue-500'
                            : 'bg-white/40 dark:bg-zinc-800/40'
                        }`}
                >
                    Create List
                </button>
                <button
                    onClick={() => setShowCalc(true)}
                    className="py-1.5 px-2 rounded-lg border border-white/30 dark:border-white/10 text-center font-medium backdrop-blur-md bg-white/40 dark:bg-zinc-800/40 active:scale-95"
                >
                    Calculator
                </button>
                <button
                    onClick={() => setActiveTab('all')}
                    className={`py-1.5 px-2 rounded-lg border border-white/30 dark:border-white/10 text-center font-medium backdrop-blur-md transition-all active:scale-95 ${activeTab === 'all'
                            ? 'bg-blue-600/80 text-white border-blue-500'
                            : 'bg-white/40 dark:bg-zinc-800/40'
                        }`}
                >
                    All Lists
                </button>
            </div>

            {/* Datalist for unit suggestions */}
            <datalist id="unit-options">
                <option value="Piece" />
                <option value="Litter" />
                <option value="Gram" />
                <option value="KG" />
                <option value="Packet" />
            </datalist>

            {/* VIEW: Create List & Last List */}
            {(activeTab === 'create' || activeTab === 'last') && (
                <div className="space-y-2">
                    {/* Header Card */}
                    <div className="p-2.5 rounded-xl backdrop-blur-md bg-white/40 dark:bg-zinc-900/40 border border-white/30 dark:border-white/10 shadow-sm flex flex-col gap-2">
                        <input
                            type="text"
                            placeholder="List Title..."
                            value={currentList.title}
                            onChange={(e) =>
                                setCurrentList((prev) => ({ ...prev, title: e.target.value }))
                            }
                            className="w-full text-[16px] font-bold bg-transparent outline-none border-b border-gray-300 dark:border-gray-700 pb-1 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
                        />
                        <div className="flex justify-between items-center text-[13px]">
                            <button
                                onClick={addItemToCurrentList}
                                className="py-1 px-3 bg-emerald-600/80 hover:bg-emerald-600 text-white font-medium rounded-lg backdrop-blur-md border border-white/20 transition-all active:scale-95"
                            >
                                + Add Card
                            </button>
                            <div className="font-semibold text-[13px]">
                                Total Checked:{' '}
                                <span className="text-emerald-600 dark:text-emerald-400">
                                    {grandTotal.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Checklist Items */}
                    <div className="space-y-2">
                        {currentList.items.length === 0 ? (
                            <div className="p-6 text-center text-gray-500 rounded-xl backdrop-blur-md bg-white/20 dark:bg-zinc-900/20 border border-white/20 dark:border-white/10">
                                No items added. Tap <b>+ Add Card</b> to start.
                            </div>
                        ) : (
                            currentList.items.map((item) => {
                                const itemTotal =
                                    (parseFloat(item.price) || 0) *
                                    (parseFloat(item.quantity) || 0);

                                return (
                                    <div
                                        key={item.id}
                                        className="p-2 rounded-xl backdrop-blur-md bg-white/30 dark:bg-zinc-900/30 border border-white/20 dark:border-white/10 shadow-sm flex flex-col gap-1.5"
                                    >
                                        {/* Row 1: Checkbox, Title, Delete */}
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={item.checked}
                                                onChange={(e) =>
                                                    updateItem(item.id, 'checked', e.target.checked)
                                                }
                                                className="w-4 h-4 rounded cursor-pointer accent-blue-600"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Item name..."
                                                value={item.title}
                                                onChange={(e) =>
                                                    updateItem(item.id, 'title', e.target.value)
                                                }
                                                className={`flex-1 bg-transparent outline-none text-[13px] border-b border-transparent focus:border-blue-500 placeholder:text-gray-400 ${item.checked ? 'line-through opacity-70' : ''
                                                    }`}
                                            />
                                            <button
                                                onClick={() => deleteItem(item.id)}
                                                className="text-red-500 hover:text-red-700 px-1 font-bold text-[14px]"
                                                title="Delete card"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        {/* Row 2: Price, Quantity (+ / -), Unit, Instant Total */}
                                        <div className="flex items-center justify-between gap-1.5 text-[12px]">
                                            {/* Price */}
                                            <div className="flex items-center gap-1 w-20">
                                                <span className="opacity-70">Price:</span>
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={item.price}
                                                    onFocus={(e) => e.target.select()}
                                                    onChange={(e) =>
                                                        updateItem(item.id, 'price', e.target.value)
                                                    }
                                                    className="w-full bg-white/40 dark:bg-zinc-800/50 rounded px-1 py-0.5 outline-none border border-white/30 dark:border-white/10 text-right"
                                                />
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => {
                                                        const current = parseFloat(item.quantity) || 0;
                                                        updateItem(item.id, 'quantity', Math.max(1, current - 1));
                                                    }}
                                                    className="w-5 h-5 flex items-center justify-center rounded bg-white/50 dark:bg-zinc-800/60 border border-white/20 active:scale-90 font-bold"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onFocus={(e) => e.target.select()}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (val === '') {
                                                            updateItem(item.id, 'quantity', '');
                                                        } else {
                                                            updateItem(item.id, 'quantity', parseFloat(val));
                                                        }
                                                    }}
                                                    className="w-8 text-center bg-white/40 dark:bg-zinc-800/50 rounded py-0.5 border border-white/30 dark:border-white/10 outline-none"
                                                />
                                                <button
                                                    onClick={() => {
                                                        const current = parseFloat(item.quantity) || 0;
                                                        updateItem(item.id, 'quantity', current + 1);
                                                    }}
                                                    className="w-5 h-5 flex items-center justify-center rounded bg-white/50 dark:bg-zinc-800/60 border border-white/20 active:scale-90 font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Unit input with datalist */}
                                            <input
                                                list="unit-options"
                                                value={item.unit}
                                                onChange={(e) =>
                                                    updateItem(item.id, 'unit', e.target.value)
                                                }
                                                className="w-16 bg-white/40 dark:bg-zinc-800/50 rounded px-1 py-0.5 border border-white/30 dark:border-white/10 outline-none text-[11px]"
                                            />

                                            {/* Item Total */}
                                            <div className="font-semibold text-right min-w-[50px]">
                                                {itemTotal.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                        <button
                            onClick={handleSaveCurrentList}
                            className="py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white font-medium backdrop-blur-md border border-white/20 transition-all active:scale-95"
                        >
                            Save This List
                        </button>
                        <button
                            onClick={handleClearCurrentList}
                            className="py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-medium backdrop-blur-md border border-white/20 transition-all active:scale-95"
                        >
                            Clear This List
                        </button>
                    </div>
                </div>
            )}

            {/* VIEW: Show All Lists */}
            {activeTab === 'all' && (
                <div className="space-y-2">
                    {/* Header Controls */}
                    <div className="flex justify-between items-center p-2 rounded-xl backdrop-blur-md bg-white/40 dark:bg-zinc-900/40 border border-white/20 dark:border-white/10">
                        <span className="font-semibold text-[16px]">Saved Lists ({lists.length})</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    try {
                                        const cached = localStorage.getItem(STORAGE_KEY);
                                        if (cached) {
                                            setLists(JSON.parse(cached).lists || []);
                                        }
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }}
                                className="py-1 px-2.5 text-[12px] rounded-lg bg-white/50 dark:bg-zinc-800/60 border border-white/20 active:scale-95"
                            >
                                Reload
                            </button>
                            <button
                                onClick={() => setShowConfirmClearAll(true)}
                                className="py-1 px-2.5 text-[12px] rounded-lg bg-red-500/80 text-white border border-white/20 active:scale-95"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>

                    {/* List Entries (Single-Line Rows) */}
                    <div className="space-y-1.5">
                        {lists.length === 0 ? (
                            <div className="p-6 text-center text-gray-500 rounded-xl backdrop-blur-md bg-white/20 dark:bg-zinc-900/20 border border-white/20 dark:border-white/10">
                                No saved lists found.
                            </div>
                        ) : (
                            lists.map((l) => (
                                <div
                                    key={l.id}
                                    onClick={() => setPreviewList(l)}
                                    className="flex items-center justify-between p-2 rounded-xl backdrop-blur-md bg-white/35 dark:bg-zinc-900/35 border border-white/20 dark:border-white/10 hover:bg-white/50 dark:hover:bg-zinc-800/50 cursor-pointer transition-all"
                                >
                                    <div className="flex items-center gap-2 overflow-hidden truncate flex-1 mr-2">
                                        <span className="font-medium text-[13px] truncate">
                                            {l.title || 'Untitled'}
                                        </span>
                                        <span className="text-[11px] opacity-60 flex-shrink-0">
                                            ({l.date})
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => handleDeleteSingleList(l.id, e)}
                                        className="text-red-500 hover:text-red-700 font-bold px-2 py-0.5 rounded text-[13px] flex-shrink-0"
                                        title="Delete List"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* MODAL: View Single List Modal */}
            {previewList && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-zinc-900/90 border border-white/30 dark:border-white/10 p-3 shadow-2xl flex flex-col max-h-[85vh]">
                        <div className="flex justify-between items-center border-b border-gray-200 dark:border-zinc-800 pb-2 mb-2">
                            <div>
                                <h3 className="text-[16px] font-bold">{previewList.title}</h3>
                                <span className="text-[11px] opacity-60">{previewList.date}</span>
                            </div>
                            <button
                                onClick={() => setPreviewList(null)}
                                className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-lg font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-1 space-y-1.5 pr-1">
                            {previewList.items.map((it, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between items-center text-[12px] p-1.5 rounded bg-white/40 dark:bg-zinc-800/40 border border-white/20 dark:border-white/5"
                                >
                                    <span className={it.checked ? 'line-through opacity-60' : ''}>
                                        {it.title || 'Item'} ({it.quantity} {it.unit})
                                    </span>
                                    <span className="font-semibold">
                                        {((parseFloat(it.price) || 0) * (parseFloat(it.quantity) || 0)).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Total Marked Amount Display */}
                        <div className="flex justify-between items-center text-[13px] font-semibold pt-2 border-t border-gray-200 dark:border-zinc-800">
                            <span>Total Marked:</span>
                            <span className="text-emerald-600 dark:text-emerald-400">
                                {previewList.items
                                    .reduce((acc, it) => {
                                        if (it.checked) {
                                            return acc + (parseFloat(it.price) || 0) * (parseFloat(it.quantity) || 0);
                                        }
                                        return acc;
                                    }, 0)
                                    .toFixed(2)}
                            </span>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={() => {
                                    setCurrentList(previewList);
                                    setActiveTab('create');
                                    setPreviewList(null);
                                }}
                                className="flex-1 py-1.5 bg-blue-600 text-white rounded-lg font-medium text-[13px] active:scale-95"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setPreviewList(null)}
                                className="flex-1 py-1.5 bg-gray-300 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium text-[13px] active:scale-95"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: Confirm Clear All */}
            {showConfirmClearAll && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-xs rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-zinc-900/90 border border-white/30 dark:border-white/10 p-3 shadow-xl text-center">
                        <h4 className="text-[16px] font-bold mb-2">Delete All Lists?</h4>
                        <p className="text-[13px] opacity-75 mb-3">
                            This will permanently delete all cached checklists.
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={handleClearAllLists}
                                className="flex-1 py-1.5 bg-red-600 text-white rounded-lg font-medium active:scale-95"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowConfirmClearAll(false)}
                                className="flex-1 py-1.5 bg-gray-300 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium active:scale-95"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: BODMAS Calculator */}
            {showCalc && <CalculatorModal onClose={() => setShowCalc(false)} />}
        </div>
    );
}

// ----------------------------------------------------
// Calculator Component with BODMAS & Percentage Logic
// ----------------------------------------------------
function CalculatorModal({ onClose }) {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');

    const appendChar = (char) => {
        setExpression((prev) => prev + char);
    };

    const handleClearAll = () => {
        setExpression('');
        setResult('');
    };

    const handleDeleteDigit = () => {
        setExpression((prev) => prev.slice(0, -1));
    };

    const handleBracket = () => {
        const openCount = (expression.match(/\(/g) || []).length;
        const closeCount = (expression.match(/\)/g) || []).length;
        const lastChar = expression.slice(-1);

        if (
            openCount > closeCount &&
            !['+', '-', '*', '/', '('].includes(lastChar) &&
            lastChar !== ''
        ) {
            appendChar(')');
        } else {
            appendChar('(');
        }
    };

    // Safe BODMAS evaluator supporting sample percentages
    const calculateResult = (expToEval) => {
        const targetExp = typeof expToEval === 'string' ? expToEval : expression;
        try {
            if (!targetExp.trim()) return;

            // Handle standard % operations: (A + B%), (A - B%), (A * B%), (A / B%)
            let parsed = targetExp.replace(
                /(\d+(?:\.\d+)?)\s*([\+\-\*\/])\s*(\d+(?:\.\d+)?)%/g,
                (_, base, op, pct) => {
                    if (op === '+') return `(${base} + (${base} * ${pct} / 100))`;
                    if (op === '-') return `(${base} - (${base} * ${pct} / 100))`;
                    if (op === '*') return `((${base} * ${pct}) / 100)`;
                    if (op === '/') return `((${base} / ${pct}) * 100)`;
                    return _;
                }
            );

            // Handle remaining standalone %
            parsed = parsed.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');

            // Validate allowed characters for safety
            if (!/^[0-9+\-*/().\s]+$/.test(parsed)) {
                setResult('0');
                return;
            }

            // Evaluate according to standard JS BODMAS order of precedence
            const evalFn = new Function(`'use strict'; return (${parsed})`);
            const val = evalFn();

            if (Number.isFinite(val)) {
                const rounded = Number(Math.round(val + 'e+8') + 'e-8');
                setResult(rounded.toString());
            } else {
                setResult('0');
            }
        } catch {
            setResult('0');
        }
    };

    // Custom Percentage Evaluation: Keeps expression intact in top line, displays result below
    const handlePercentage = () => {
        if (!expression) return;
        const newExp = expression + '%';
        setExpression(newExp);
        calculateResult(newExp);
    };

    const buttons = [
        { label: 'AC', action: handleClearAll, colSpan: 'col-span-1', color: 'bg-red-500/30 text-red-600 dark:text-red-400' },
        { label: '⌫', action: handleDeleteDigit, color: 'bg-amber-500/20' },
        { label: '( )', action: handleBracket, color: 'bg-blue-500/20' },
        { label: '%', action: handlePercentage, color: 'bg-blue-500/20' },

        { label: '7', action: () => appendChar('7') },
        { label: '8', action: () => appendChar('8') },
        { label: '9', action: () => appendChar('9') },
        { label: '÷', action: () => appendChar('/'), color: 'bg-indigo-500/20' },

        { label: '4', action: () => appendChar('4') },
        { label: '5', action: () => appendChar('5') },
        { label: '6', action: () => appendChar('6') },
        { label: '×', action: () => appendChar('*'), color: 'bg-indigo-500/20' },

        { label: '1', action: () => appendChar('1') },
        { label: '2', action: () => appendChar('2') },
        { label: '3', action: () => appendChar('3') },
        { label: '-', action: () => appendChar('-'), color: 'bg-indigo-500/20' },

        { label: '0', action: () => appendChar('0') },
        { label: '.', action: () => appendChar('.') },
        { label: '=', action: () => calculateResult(), color: 'bg-emerald-600 text-white font-bold' },
        { label: '+', action: () => appendChar('+'), color: 'bg-indigo-500/20' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-xs rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-zinc-900/90 border border-white/30 dark:border-white/10 p-3 shadow-2xl">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[13px] font-semibold opacity-70">Calculator</span>
                    <button onClick={onClose} className="text-[16px] font-bold px-1">✕</button>
                </div>

                {/* 2-Line Display: Top line operation only, bottom line result only */}
                <div className="p-2 mb-2 rounded-xl bg-black/5 dark:bg-black/40 border border-white/20 text-right flex flex-col justify-end min-h-[64px]">
                    <div className="text-[13px] opacity-70 tracking-wider overflow-x-auto whitespace-nowrap min-h-[18px]">
                        {expression}
                    </div>
                    <div className="text-[20px] font-bold overflow-x-auto whitespace-nowrap min-h-[28px]">
                        {result}
                    </div>
                </div>

                {/* Buttons Grid */}
                <div className="grid grid-cols-4 gap-1.5 text-[14px]">
                    {buttons.map((btn, index) => (
                        <button
                            key={index}
                            onClick={btn.action}
                            className={`h-11 rounded-lg border border-white/20 dark:border-white/10 flex items-center justify-center font-medium backdrop-blur-md active:scale-95 transition-all ${btn.color || 'bg-white/40 dark:bg-zinc-800/40'
                                } ${btn.colSpan || ''}`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}