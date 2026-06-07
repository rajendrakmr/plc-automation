import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";

export const metadata = {
    title: "Login",
    description: "PLC automation spare parts supplier",
};

export default function Login() {
    return (

        <main>
            <Header />
            <section className="hero">
                <div className="login-wrapper">
                    <div className="login-card">

                        <h3>Administrator Login 👋</h3>
                        <p>Unauthorized access to this portal is strictly prohibited.</p>

                        <form className="login-form">
                            <input type="email" placeholder="Email Address" required />
                            <input type="password" placeholder="Password" required />

                            <button type="submit" className="login-btn">
                                Sign In to Dashboard →
                            </button>
                        </form>

                    </div>
                </div>



            </section>
            <Footer />
        </main>
    );
}