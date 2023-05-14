
const Header = ({ title }) => {
  return (
    <>
    <div className="p-5">
      <h1 className="mb-5 font-semibold text-2xl">
        {title}
      </h1>
    </div>
    <hr />
    </>
  )
}

export default Header