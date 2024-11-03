import Image from "next/image";
import Banner from "@/components/Banner";
import FeaturedProducts from "@/components/FeaturedProducts";


export default function Home() {

  return (
    <div>
      <Banner />
      <main>
        <FeaturedProducts />
      </main>
    </div>
  );
}
