
export interface HeaderProps {
  userName: string;
}

const Header = ({ userName }: HeaderProps) => {
  return (
    <header className="flex justify-between bg-blue-950 text-white py-4 px-6">
      <h1 className="text-2xl font-bold">Demo App</h1>
      <div className="flex gap-5" >
        <p>{userName}</p>
        <img
          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
    </header>
  );
};

export default Header;
