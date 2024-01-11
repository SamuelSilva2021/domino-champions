import Sidebar from "./sidebar";

function RootLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row md:gap-5">
      <Sidebar className="md:w-1/4" />
      <main className="flex-1 mx-auto py-4">{children}</main>
    </div>
  );
}

export default RootLayout;
