import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Craft and&nbsp;</h1>
				<h1 className={title({ color: "violet", className:"font-bold" })}>Solve&nbsp;</h1>
				<br />
				<h1 className={title()}>
					qustions & build qizzes.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Your online qustion bank.
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					isExternal
					href={'/addquestion'}
					className={buttonStyles({ color: "primary", size:"lg", radius: "full", variant: "bordered", })}
				>
					<span className="text-lg font-bold tracking-wide">Add Qustion</span>
				</Link>
				<Link
					isExternal
					href={'/explore'}
					className={buttonStyles({ color: "primary", size:"lg", radius: "full", variant: "shadow", })}
				>
					<span className="text-lg font-bold tracking-wide">Explore</span>
				</Link>
			</div>
		</section>
	);
}
