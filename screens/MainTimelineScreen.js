import AppLayout from "../components/AppLayout";
import TimelineTabs from "../components/Tabs/TimelineTabs";
import { MainScreenTopBar } from "../components/Bars/MainScreenTopBar";

export const MainTimelineScreen = () => {
    return (
        <>
            <AppLayout>
                <MainScreenTopBar />
                <TimelineTabs />
            </AppLayout>
        </>
    );
};
