import { useEffect, useRef } from "react";
import "./SliceSection.css";

export function SliceSection() {
  const elRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const y = e.clientY / window.innerHeight;
      let top = y * 100;
      top = Math.min(70, Math.max(30, top));
      const bottom = top + 14;
      document.documentElement.style.setProperty("--cut-top", `${top}%`);
      document.documentElement.style.setProperty("--cut-bottom", `${bottom}%`);
      document.documentElement.style.setProperty("--cut-top-2", `${top + 10}%`);
      document.documentElement.style.setProperty("--cut-bottom-2", `${bottom + 10}%`);
    };

    const el = elRef.current;
    const handleInput = () => {
      if (el) el.dataset.text = el.innerText;
    };

    document.addEventListener("mousemove", handleMouseMove);
    el?.addEventListener("input", handleInput);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      el?.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <section className="slice-section">
      <div className="box">
        <p className="small">Edit me!</p>
        <p
          ref={elRef}
          className="slice"
          id="slice"
          contentEditable
          suppressContentEditableWarning
          data-text="OSWAP"
        >
          <span className="slice__text">OSWAP</span>
        </p>
      </div>
    </section>
  );
}
