import React from "react";



export default (monto , metodoDePago) => {

return(
<div>
<h1>Transaccion exitosa</h1>
<h2>Se agrega la compra en {metodoDePago}</h2>
<h2>por el monto de {monto}</h2>


</div>

)

}