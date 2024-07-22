import TopNav from "../_components/top-nav";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <TopNav />
      {children}
    </div>
  );
}
