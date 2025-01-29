import Image from "next/image";
import Samehadaku from "../../public/samehadaku.png";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-center py-4 flex flex-col justify-center items-center border-t">
      <p>Thank you</p>
      <Link href="https://samehadaku.mba">
        <Image src={Samehadaku} alt="Samehadaku" width={200} height={50} />
      </Link>
    </footer>
  );
}
