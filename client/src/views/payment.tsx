export default function Payment() {
    return (
        <div id="payment-page">

            <form action="" method="post">
                <h1>Confirm Payment</h1>

                <div className="input-area">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>

                <div className="input-area">
                    <label htmlFor="card_holder">Card Holder</label>
                    <input type="text" name="card_holder" id="card_holder" />
                </div>

                <div className="input-area">
                    <label htmlFor="card_number">Card Number</label>
                    <input type="tel" name="card_number" id="card_number" placeholder="XXXX - XXXX - XXXX - XXXX" />
                </div>

                <div className="input-group">
                    <div className="input-area">
                        <label htmlFor="expiry">Expiry</label>
                        <input type="text" name="expiry" id="expiry" placeholder="MM/YYYY" />
                    </div>

                    <div className="input-area">
                        <label htmlFor="cvv">CVV</label>
                        <input type="number" name="cvv" id="cvv" />
                    </div>
                </div>

                <button>Confirm Payment</button>

            </form>

        </div>
    )
}