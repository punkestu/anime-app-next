import Image from "next/image";
import Samehadaku from "../../public/samehadaku.png";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 dark:text-white text-center py-4 flex flex-col justify-center items-center">
      <p>Thank you</p>
      <Link href={process.env.SAMEHADAKU_WEB ?? ""}>
        <Image src={Samehadaku} alt="Samehadaku" width={200} height={50} />
      </Link>
    </footer>
  );
}
