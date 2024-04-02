// Importa el componente ListaProductos
import ListaProductos from './ListaProductos';

// En tu componente principal, donde tengas acceso a los productos
function App() {
  const productos = [/* Tu arreglo de productos */];

  return (
    <div className="container-reportes">
       <ListaProductos productos={productos} />
    </div>
  );
}

export default App;
