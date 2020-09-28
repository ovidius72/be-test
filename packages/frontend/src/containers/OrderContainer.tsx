/* import {FC, useEffect} from "react"; */
/* import {loadOrderThunk} from "src/features/orders/orders.slice"; */
/* import {useAppDispatch, userAppSelector} from "src/store/store"; */



/* const OrderContainer: FC = () => { */
/*   const dispatch = useAppDispatch(); */
/*   const { orders, error, loading }= userAppSelector(s => s.orders); */
/*   const erpId = userAppSelector(s => s.login.user?.erpId); */

/*   const loadUserOrders = async () => { */
/*     if(erpId) { */
/*       const orders = dispatch(loadOrderThunk(erpId)); */
/*       console.log("orders", orders); */
/*     } */
/*   } */

/*   useEffect(() => { */
/*     loadUserOrders(); */
/*   }, [erpId]) */


/*   return ( */
/*     <div> */
/*     </div> */

/*   ); */

/* } */
