import {Routes, Route, Navigate} from "react-router-dom"
import {Home, Product} from "./pages"

const CustomRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default CustomRoutes