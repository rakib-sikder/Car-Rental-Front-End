// Footer.jsx
const Footer = () => (
    <footer className="bg-base-200 p-4 text-center">
      <div className="container mx-auto">
        <div className="flex justify-center items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <span className="text-lg font-bold">Car Rentals</span>
        </div>
        <p className="text-sm mt-2">© 2024 Car Rentals. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-primary">Facebook</a>
          <a href="#" className="text-primary">Twitter</a>
          <a href="#" className="text-primary">Instagram</a>
        </div>
      </div>
    </footer>
  );
  
  export default Footer;
  