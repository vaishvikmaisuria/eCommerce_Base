// import ProductContent from "../../components/ProductContent";

function orderDetailPage(props) {
  return (
    <div>
        Order Detail Page
        {props.order}
    </div>
    // <OrderContent productId={props.product}/>
  )
}

export function getStaticProps(context) {
  const { params } = context;
  const { order_id } = JSON.parse(JSON.stringify(params));

  // checkCacheData(symbol)
  // getStockData(symbol)
//   const stockData = {
//     symbol: symbol,
//     value: 178,
//     change: "+12%",
//   };

  return {
    props: {
      order: order_id,
    },
    // fetching for a single post every 500 mins
    revalidate: 300000
  };
}

export function getStaticPaths(){
    // const popularStocks = getPopularStocks();

    return {
        // add the popular stocks here
        // paths: popularStocks.map((stock) => ({params:  {stock: stock}})),
        paths: [],
        // have to create a loading screen for fallback
        // fallback: true
        fallback: 'blocking'
    }
}

export default orderDetailPage;