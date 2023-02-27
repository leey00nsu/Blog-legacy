import React from "react";
import { useRouter } from "next/router";
import Memo from "./Memo";

const Apps = () => {
  const basicLayout = (
    <section className="flex items-center justify-center py-6 grow">
      <div className="flex flex-col w-11/12 h-full" />
    </section>
  );

  const router = useRouter();
  const slug = router.query.slug as string[];
  if (slug && slug[0] === "memo") {
    return <Memo />;
  }

  return <>{basicLayout}</>;
};

export default Apps;
