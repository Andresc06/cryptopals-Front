export function NotFoundPage() {
    return (
        <div>Not Found</div>
    )
}


/*
<span className="ms-2 wallet">
                        {side != 'BUY' ? walletUser[currentCurrency] < quantity ? `The total is ${quantity} ${currentCurrency}. You have ` : "" : walletUser['USD'] < quantity ? `The total is ${quantity} ${'USDT'}. You have ` : ""}
                          <span className={quantity != 0 ? side != 'BUY' ? walletUser[currentCurrency] >= quantity ? "text-success" : "text-danger" : walletUser['USD'] >= quantity ? "text-success" : "text-danger" : ""}>
                          {side != 'BUY' ? walletUser[currentCurrency] : walletUser['USD']} {" "}
                          {side != 'BUY' ? currentCurrency == "USD"
                            ? "USDT"
                            : currentCurrency == "BUS"
                            ? "BUSD"
                            : currentCurrency : 'USDT'}</span>{side != 'BUY' ? walletUser[currentCurrency] < quantity ? " in your wallet. Insufficient funds" : "" : walletUser['USD'] < quantity ? " in your wallet. Insufficient funds" : ""}
                        </span>





                                <div className="row">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="row bg-light rounded m-3">
                <div className="px-4 my-4">
                  <label className="fw-bold text-primary">Payment details</label>
                </div>
                <div className="px-4">
                  <div className="mb-4">

                  <div className="col text-center mt-4">
                      <div className="form-check form-check-inline ms-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="side"
                          value="BUY"
                          onChange={handleSide}
                        />
                        <label className="form-check-label">BUY</label>
                      </div>
                    </div>

                    <div className="col text-center mt-4">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="crypto"
                          value="ETH"
                          onChange={handleCrypto}
                        />
                        <label className="form-check-label">ETH</label>
                        <img className="img-fluid currency" src={ETH} />
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="crypto"
                          value="BUS"
                          onChange={handleCrypto}
                        />
                        <label className="form-check-label">BUSD</label>
                        <img className="img-fluid currency ms-2" src={BUSD} />
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="crypto"
                          value="BNB"
                          onChange={handleCrypto}
                        />
                        <label className="form-check-label">BNB</label>
                        <img className="img-fluid currency ms-2" src={BNB} />
                      </div>

                      <div className="col m-3">
                        <label className="text-muted me-2">Quantity:</label>
                        <input
                          className="form-control form-control3"
                          step={
                            currentCurrency == "USD" || currentCurrency == "BUS"
                              ? "0.01"
                              : "0.0001"
                          }
                          {...register("quantity")}
                          type="number"
                          name="quantity"
                          min="0"
                          onChange={handleChange}
                          required
                        />
                        <span className="ms-2 wallet">
                        {walletUser['USD'] < quantity ? `The total is ${quantity} ${'USDT'}. You have ` : ""}
                          <span className={quantity != 0 ? walletUser['USD'] >= quantity ? "text-success" : "text-danger" : ""}>
                          {walletUser['USD']} {" USDT"}
                          </span>{walletUser['USD'] < quantity ? " in your wallet. Insufficient funds" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row d-grid">
                <button className="btn btn-success text-white fs-4 mb-2" id="button" disabled>
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : side == "BUY" ? (
                    `Buy ${message}`
                  ) : side == "Sell" ? (`Sell ${message}`) : "Choose a side"}
                </button>
              </div>
            </div>
          </form>
        </div>
*/