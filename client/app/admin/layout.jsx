import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "evercart - Admin",
    description: "evercart - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
