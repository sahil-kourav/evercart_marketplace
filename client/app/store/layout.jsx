import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "VenDora. - Store Dashboard",
    description: "VenDora. - Store Dashboard",
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
