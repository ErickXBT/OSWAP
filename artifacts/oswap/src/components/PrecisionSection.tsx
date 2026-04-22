import { useEffect, useRef } from "react";
import gsap from "gsap";

export function PrecisionSection() {
  const stageRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const col = stage.querySelector(".col") as SVGGElement | null;
    const box = stage.querySelector(".box") as SVGGElement | null;
    if (!col || !box) return;

    for (let i = 0; i < 9; i++) {
      const b = box.cloneNode(true) as SVGGElement;
      col.append(b);
    }
    gsap.set(stage.querySelectorAll(".box"), { y: (i: number) => i * 10 });

    for (let i = 0; i <= 9; i++) {
      const c = col.cloneNode(true) as SVGGElement;
      gsap.set(c, { x: 10 * i, attr: { class: "col col" + i } });
      gsap.set(c.querySelectorAll(".box"), { attr: { class: "box" + i } });
      stage.append(c);
    }
    col.remove();

    const tl = gsap.timeline();
    tl.to(stage.querySelectorAll('[class^="col"]'), {
      duration: 1.5,
      y: 11,
      ease: "sine.inOut",
      stagger: { amount: 3, repeat: -1, yoyo: true },
    }, 0);

    for (let i = 0; i <= 9; i++) {
      tl.add(
        gsap.fromTo(
          stage.querySelectorAll(".box" + i + " *"),
          {
            y: (j: number) => gsap.utils.interpolate(77, -77, j / 10),
            transformOrigin: "50%",
            scale: 0.133,
          },
          {
            y: (j: number) => gsap.utils.interpolate(i, -i, j / 10),
            scale: 0.8,
            duration: 1,
            ease: "sine",
            repeat: -1,
            yoyo: true,
            yoyoEase: "sine.in",
          }
        ),
        i / 10
      );
    }

    tl.play(50);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="py-16 md:py-32 bg-secondary/30 border-y border-border/40">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div className="flex justify-center">
          <svg
            ref={stageRef}
            className="stage w-full max-w-[18rem] md:max-w-[28rem] aspect-square overflow-hidden text-foreground"
            viewBox="0 0 98 108"
            fill="currentColor"
          >
            <mask id="precision-mask">
              <rect width="10" height="10" fill="#fff" />
            </mask>
            <g className="col">
              <g className="box" mask="url(#precision-mask)">
                <circle cx="5" cy="5" r="5" />
              </g>
            </g>
          </svg>
        </div>
        <div className="flex flex-col items-start text-left">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Precision in motion. Payments without friction.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-md">
            OSWAP synchronizes crypto and fiat in real time, so every swipe of your
            virtual card lands with the same precision you see here. Engineered for
            a borderless economy, built for the speed of modern money.
          </p>
        </div>
      </div>
    </section>
  );
}
