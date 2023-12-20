import React from 'react';

export default function Contact() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Rest of the code here
    };

    return (
        <>
            <div className="container d-flex flex-column justify-content-center align-item-center min-vh-100">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 my-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Username:
                                </label>
                                <input type="text" className="form-control" placeholder="👤 Username..." />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Wallet Address:
                                </label>
                                <input type="text" placeholder="🌏 Address..." />
                            </div>
                            <div className="form-floating">
                            <label htmlFor="floatingTextarea2">Message: </label>
                                <textarea
                                    className="form-control"
                                    placeholder="📨 Message here..."
                                    id="floatingTextarea2"
                                    style={{ height: '100px' }}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <img src="images/contact.svg" alt="contact.svg" style={{ height: '500px', width: '500px' }} />
                    </div>
                </div>
            </div>
            <style>{`
            input{
                border-radius:10px
            }
            `}</style>
        </>
    );
}
