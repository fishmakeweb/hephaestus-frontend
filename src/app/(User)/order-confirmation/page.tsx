import OrderConfirmPage from "./suspense-wrapper"
import { Suspense } from "react"

const SuspenseWrapper = () => (
	<Suspense>
		<OrderConfirmPage />
	</Suspense>
)

export default SuspenseWrapper