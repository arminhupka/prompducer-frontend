import CouponContent from "./CouponContent";
import CouponProvider from "./CouponProvider";

const Coupon = () => (
	<CouponProvider>
		<CouponContent />
	</CouponProvider>
);

export default Coupon;
