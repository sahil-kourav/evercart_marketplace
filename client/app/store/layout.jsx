import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "evercart. - Store Dashboard",
    description: "evercart. - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
