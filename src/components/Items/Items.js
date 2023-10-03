import "./Items.css";

const Items = ({ items }) => {
  return (
    <div>
      <h5>{items.length > 0 ? "Lista obrazów" : "- brak obrazów -"}</h5>
      {items.length > 0 && (
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nazwa</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{item.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Items;
