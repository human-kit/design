<script lang="ts" module>
	import { badgeTones, type BadgeTone } from '@registry/ui/badge';
	import { tv, type VariantProps } from '@registry/lib/utils';

	/** Each tone's fill, written out whole so Tailwind finds each class. */
	const FILLS: Record<BadgeTone, string> = {
		gray: '[--avatar-fill:var(--tone-gray-fill)] [--avatar-ink:var(--tone-gray-fill-ink)]',
		blue: '[--avatar-fill:var(--tone-blue-fill)] [--avatar-ink:var(--tone-blue-fill-ink)]',
		cyan: '[--avatar-fill:var(--tone-cyan-fill)] [--avatar-ink:var(--tone-cyan-fill-ink)]',
		teal: '[--avatar-fill:var(--tone-teal-fill)] [--avatar-ink:var(--tone-teal-fill-ink)]',
		green: '[--avatar-fill:var(--tone-green-fill)] [--avatar-ink:var(--tone-green-fill-ink)]',
		amber: '[--avatar-fill:var(--tone-amber-fill)] [--avatar-ink:var(--tone-amber-fill-ink)]',
		orange: '[--avatar-fill:var(--tone-orange-fill)] [--avatar-ink:var(--tone-orange-fill-ink)]',
		red: '[--avatar-fill:var(--tone-red-fill)] [--avatar-ink:var(--tone-red-fill-ink)]',
		pink: '[--avatar-fill:var(--tone-pink-fill)] [--avatar-ink:var(--tone-pink-fill-ink)]',
		violet: '[--avatar-fill:var(--tone-violet-fill)] [--avatar-ink:var(--tone-violet-fill-ink)]'
	};

	/** The fill, a step lighter at the top, so the tile reads as lit from above. */
	const GRADIENT =
		'bg-linear-to-b from-[color-mix(in_oklch,var(--avatar-fill)_80%,white)] to-(--avatar-fill)';

	/**
	 * A tile of colour with dark initials in its own hue, its corners at 30% of its side: rounder than a
	 * button, short of a circle. A light along its top and a hairline round it, drawn over a
	 * photo too, so a pale picture still keeps its edge. The initials sit on the same scale as
	 * the rest of the kit: 20px beside a row's text, 24px beside a button, 32px at the head of a
	 * card.
	 */
	export const avatarVariants = tv({
		slots: {
			root: [
				'relative inline-grid shrink-0 overflow-hidden rounded-[30%] align-middle select-none',
				'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit]',
				'after:shadow-[inset_0_1px_0_oklch(1_0_0/0.2),inset_0_0_0_1px_oklch(0_0_0/0.1)]'
			],
			image: 'size-full object-cover',
			fallback:
				'grid size-full place-items-center leading-none font-semibold text-(--avatar-ink,var(--ink))'
		},
		variants: {
			size: {
				sm: { root: 'size-5', fallback: 'text-[0.5625rem]' },
				default: { root: 'size-6', fallback: 'text-[0.625rem]' },
				lg: { root: 'size-8', fallback: 'text-small' }
			}
		},
		defaultVariants: { size: 'default' }
	});

	export type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>['size']>;

	/**
	 * The fill of a tone, for a mark drawn like an avatar.
	 *
	 * Its initials take the tone's fill ink, at 4.7:1 or more on the darkest end of the fill. The name is always read out whole, never the letters.
	 */
	export function avatarFillClass(tone: BadgeTone) {
		return `${FILLS[tone]} ${GRADIENT}`;
	}

	/** The same name always gets the same tone, from nothing but its letters. */
	export function toneForName(name: string): BadgeTone {
		const sum = [...name].reduce((total, char) => total + (char.codePointAt(0) ?? 0), 0);
		return badgeTones[sum % badgeTones.length];
	}

	/**
	 * The first letter of the first two words: "Ana María Ruiz" is "AM". Words written in lower
	 * case are passed over when there are others, so "Clínica del Norte" is "CN" and not "CD".
	 */
	export function initialsOf(name: string): string {
		const words = name.trim().split(/\s+/).filter(Boolean);
		const capitalised = words.filter((word) => /^\p{Lu}/u.test(word));
		return (capitalised.length > 0 ? capitalised : words)
			.slice(0, 2)
			.map((word) => [...word][0].toLocaleUpperCase())
			.join('');
	}
</script>

<script lang="ts">
	import { Avatar as AvatarPrimitive } from '@human-kit/ui/avatar';
	import type { ComponentProps } from 'svelte';

	type Props = Omit<ComponentProps<typeof AvatarPrimitive.Root>, 'children'> & {
		/** Who or what it shows. It gives the initials, the tone and the name read out. */
		name: string;
		/** A picture: it takes the place of the initials, in the same box. */
		src?: string;
		size?: AvatarSize;
		/** A tone of its own, instead of the one the name gives. */
		tone?: BadgeTone;
		/** Leave it unnamed when the name is already written beside it, so it is not read twice. */
		decorative?: boolean;
	};

	let {
		name,
		src,
		size = 'default',
		tone,
		decorative = false,
		class: className,
		element = $bindable(null),
		...restProps
	}: Props = $props();

	const styles = $derived(avatarVariants({ size }));
	const toneClass = $derived(avatarFillClass(tone ?? toneForName(name)));
</script>

<!--
	The picture is shown once it has loaded, and the initials until then, or when it fails: a
	broken picture never shows. Its name goes on the picture, or on the initials in its place.
-->
<AvatarPrimitive.Root bind:element class={styles.root({ class: className })} {...restProps}>
	<AvatarPrimitive.Image {src} alt={decorative ? '' : name} class={styles.image()} />
	<AvatarPrimitive.Fallback class={styles.fallback({ class: toneClass })}>
		{initialsOf(name)}
	</AvatarPrimitive.Fallback>
</AvatarPrimitive.Root>
