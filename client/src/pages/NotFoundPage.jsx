
import Button from "../components/Button";

const NotFoundPage = () => {
  return <>
    <title>Page Not Found | MBS</title>
    <div className="max-w-5xl mx-auto py-8 px-4 h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">Page Not Found</h1>
      <p>The page you requested was not found.</p>
      <Button variant="primary" className="mt-4" href="/">Return Home</Button>
    </div>
  </>
}

export default NotFoundPage;