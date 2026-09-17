import ChecklistApp from '@/component/Features/checkList/page';

const metadata = {
    title: 'Checklist App | Monir Hossen | Code By Monir',
    description: 'You can manage your tasks and check them off as you complete them.',
};

const page = () => {
    return (
        <div>
            <ChecklistApp />
        </div>
    );
};

export default page;