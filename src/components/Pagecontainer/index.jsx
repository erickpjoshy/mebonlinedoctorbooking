import './pagecontainer.css';

const Pagecontainer = ({ heading = '', children }) => {
  return (
    <div>
      <h1 className="text-sm sm:text-2xl">{heading}</h1>
      <div className="page-container">{children}</div>
    </div>
  );
};

export default Pagecontainer;
