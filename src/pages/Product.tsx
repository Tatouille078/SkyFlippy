import { AnimatedShapes, Header } from '../components'
import { useParams } from 'react-router-dom'
import { useStateContext } from '../context'
import { Product as P } from '../Calculus'

const Product = () => {
    const {getItem} = useStateContext()
    const {id} = useParams()
    const product: P | null = getItem<P>("product")
    if (!product || product.productID != id) {
        window.location.href="/"
        return null
    }
    return (
        <div className="min-h-screen bg-white overflow-y-hidden">
            <AnimatedShapes />
            <Header />
            {product.productID}
        </div>
    )
}

export default Product