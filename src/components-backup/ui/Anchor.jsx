import Link from "next/link";

export default function Anchor({ customClassName, children, ...props }) {
  return (
    <>
      <Link {...props} className={`px-5 py-3 text-sm text-color1/70 hover:text-color1 ${customClassName}`}>{children}</Link>
    </>
  );
}
