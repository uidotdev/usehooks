import { useState } from "react";
import { motion } from "framer-motion";
import { set } from "astro/zod";

const springConfig = {
  damping: 20,
  stiffness: 120,
  mass: 0.15,
};

export default function CodeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hideExpand, setHideExpand] = useState(false);

  return (
    <div className="relative bg-brand-coal rounded-[.5rem]">
      <motion.div
        variants={{
          expanded: {
            height: "auto",
          },
          collapsed: {
            height: "500px",
          },
        }}
        transition={springConfig}
        initial="collapsed"
        animate={expanded ? "expanded" : "collapsed"}
        className="relative overflow-auto "
      >
        <div
          ref={(el) => {
            if (el) {
              const { height } = el.getBoundingClientRect();
              if (height < 500) {
                setExpanded(true);
                setHideExpand(true);
              }
            }
          }}
        >
          {children}
        </div>
      </motion.div>
      {!hideExpand && (
        <div
          className={`${
            expanded ? "relative" : "absolute"
          } bottom-0 w-full p-4`}
        >
          <button
            className="font-bold uppercase rounded-full px-4 py-1 flex text-xs items-center justify-center bg-brand-charcoal text-brand-beige gap-2 hover:shadow-sm hover:bg-brand-green hover:text-brand-charcoal border border-brand-charcoal transition-all"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>
      )}
    </div>
  );
}
