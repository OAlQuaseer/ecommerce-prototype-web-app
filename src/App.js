
const App = () => {

  const categories = [
    {
      id: 1,
      title: 'Hats'
    },
    {
      id: 2,
      title: 'Women'
    },
    {
      id: 3,
      title: 'Sneakers'
    },
    {
      id: 4,
      title: 'Men'
    },
    {
      id: 5,
      title: 'Hats'
    }
  ];

  return (
    <div className="categories-container">
      {
        categories.map(({ title, id }) => (
          <div className="category-container">
            <div className="background-image"></div>
            <div className="category-body-container">
              <h2>{title}</h2>
              <p>Shop now</p>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default App;
