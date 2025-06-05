import Axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface UserType {
	authorized: boolean;
	data: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
}

export default function Payment() {
	const location = useLocation();
	const navigate = useNavigate();
	const emailRef = useRef<HTMLInputElement | null>(null);
	const cardHolderRef = useRef<HTMLInputElement | null>(null);
	const cardNumberRef = useRef<HTMLInputElement | null>(null);
	const expiryRef = useRef<HTMLInputElement | null>(null);
	const cvvRef = useRef<HTMLInputElement | null>(null);

	const [user, setUser] = useState<UserType>({
		authorized: false,
		data: { id: "", firstName: "", lastName: "", email: "" },
	});

	useEffect(() => {
		let storedData: unknown = sessionStorage.getItem("_user_data");

		if (storedData == null) {
			storedData = {} as object;
		} else {
			storedData = JSON.parse(storedData as string);
		}

		setUser(storedData as UserType);
	}, []);

	const confirmPayment = () => {
		const email = emailRef.current!.value;
		const cardHolder = cardHolderRef.current!.value;
		const cardNumber = cardNumberRef.current!.value;
		const expiry = expiryRef.current!.value;
		const cvv = cvvRef.current!.value;

		if (!email || !cardHolder || !cardNumber || !expiry || !cvv) {
			alert("Please fill in all fields.");
			return;
		}
		if (!email.includes("@") || !email.includes(".")) {
			alert("Please enter a valid email address.");
			return;
		}
		if (
			cardNumber.length !== 19 ||
			!/^\d{4} - \d{4} - \d{4} - \d{4}$/.test(cardNumber)
		) {
			alert(
				"Please enter a valid card number in the format XXXX - XXXX - XXXX - XXXX."
			);
			return;
		}
		if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expiry)) {
			alert("Please enter a valid expiry date in the format MM/YYYY.");
			return;
		}
		if (cvv.length !== 3 || !/^\d{3}$/.test(cvv)) {
			alert("Please enter a valid CVV.");
			return;
		}

		const tmp_url = location.pathname.split("/");
		const courseId = tmp_url[tmp_url.length - 1];

		Axios({
			method: "POST",
			url: `http://localhost:5112/courses/${courseId}/subscribe`,
			data: {
				userId: user.data.id,
				courseId: courseId,
			},
		})
			.then((response) => {
				if (response.data.success) {
					alert(response.data.message);
					navigate("/user/mycourses");
				}
			})
			.catch((err) => {
				if (err.response.status == 400) {
					alert(err.response.data);
				}
			});
	};

    const handleCardNumberInput = (event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
            console.log(event.target.value)
        }
    }

    const handleCvvInput = (event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
            console.log(event.target.value)
        }
    }

	return (
		<div id="payment-page">
			<form action="" method="post">
				<h1>Confirm Payment</h1>

				<div className="input-area">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						ref={emailRef}
					/>
				</div>

				<div className="input-area">
					<label htmlFor="card_holder">Card Holder</label>
					<input
						type="text"
						name="card_holder"
						id="card_holder"
						ref={cardHolderRef}
					/>
				</div>

				<div className="input-area">
					<label htmlFor="card_number">Card Number</label>
					<input
						type="tel"
						name="card_number"
						id="card_number"
                        maxLength={16}
                        onKeyDown={handleCardNumberInput}
						placeholder="XXXX - XXXX - XXXX - XXXX"
						ref={cardNumberRef}
					/>
				</div>

				<div className="input-group">
					<div className="input-area">
						<label htmlFor="expiry">Expiry</label>
						<input
							type="month"
							name="expiry"
							id="expiry"
							placeholder="MM/YYYY"
							ref={expiryRef}
						/>
					</div>

					<div className="input-area">
						<label htmlFor="cvv">CVV</label>
						<input type="tel" onKeyDown={handleCvvInput} name="cvv" id="cvv" ref={cvvRef} minLength={3} maxLength={4} />
					</div>
				</div>

				<button type="button" onClick={confirmPayment}>
					Confirm Payment
				</button>
			</form>
		</div>
	);
}
