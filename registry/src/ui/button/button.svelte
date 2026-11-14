<script lang="ts" module>
	import { tv, type VariantProps } from '@registry/lib/utils';

	/** A control with a box stands off the page and sinks while it is pressed. */
	const lifted =
		'shadow-control data-hovered:not-data-pressed:shadow-control-hover data-pressed:shadow-control-pressed';

	export const buttonVariants = tv({
		base: [
			'relative inline-flex max-w-full min-w-0 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-control font-medium whitespace-nowrap select-none',
			'transition-[opacity,box-shadow,color,background-color] duration-150 ease-out outline-hidden',
			// The ring follows `data-focus-visible`, not `:focus-visible`: the primitive also
			// shows it when the focus comes back from an overlay after a key press.
			'data-focus-visible:shadow-focus',
			'data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-45',
			'data-pending:cursor-progress',
			'[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
		],
		variants: {
			variant: {
				// The one action the screen is for.
				default:
					'bg-primary text-on-primary shadow-primary data-hovered:bg-primary-hover data-pressed:shadow-primary-pressed',
				// Every other action of a toolbar or a form.
				outline: `bg-surface text-ink-muted data-hovered:text-ink ${lifted}`,
				// Icons and actions that repeat down a list: no box until the pointer is on it.
				ghost: 'text-ink-muted data-hovered:bg-hover data-hovered:text-ink data-pressed:bg-hover',
				// A faint fill and no edge: a control that is always there but rarely the point.
				soft: 'bg-ink/4 text-ink-muted data-hovered:bg-ink/7 data-hovered:text-ink data-pressed:bg-ink/7',
				// `ghost` for the action that destroys what it sits in.
				danger: 'text-danger-ink data-hovered:bg-danger-soft data-pressed:bg-danger-soft',
				// `outline` for the step that closes a record for good: the box of its neighbours, red
				// only in its words, so it does not shout louder than going ahead.
				'outline-danger': `bg-surface text-danger-ink data-hovered:bg-danger-soft ${lifted}`,
				link: 'text-ink underline-offset-4 data-hovered:underline data-focus-visible:underline'
			},
			size: {
				default: 'h-6.5 px-2 text-small',
				sm: 'h-6 px-1.5 text-small [&_svg]:size-3.5',
				xs: 'h-5.5 gap-1 px-1.5 text-small [&_svg]:size-3.5',
				icon: 'size-6.5',
				'icon-sm': 'size-6 [&_svg]:size-3.5',
				'icon-xs': 'size-5.5 [&_svg]:size-3.5',
				// Its corner follows its size: the 8px corner on an 18px box makes a circle.
				'icon-2xs': 'size-4.5 rounded-md [&_svg]:size-3'
			},
			/** Set by the component when `icon` leads the label. */
			iconed: { true: '', false: '' },
			/** Set by the component when `count` ends the label. */
			counted: { true: '', false: '' }
		},
		compoundVariants: [
			// A link has no box of its own, thus no size applies to it. It is laid out as text, so
			// its underline reaches what is inside it.
			{
				variant: 'link',
				class:
					'inline-block h-auto w-fit justify-start p-0 text-body shadow-none [&_svg]:inline-block [&_svg]:size-3.5 [&_svg]:align-[-0.15em]'
			},
			// The icon's box carries a margin around its glyph. With the same padding on both sides,
			// a label led by an icon stands further from its left edge than from its right one.
			{ iconed: true, size: ['sm', 'xs'], class: 'pl-1' },
			{ iconed: true, size: 'default', class: 'pl-1.5' },
			// The count ends the button as far from its edge as the icon's ink starts it.
			{ counted: true, size: ['sm', 'xs'], class: 'pr-1.25' },
			// On an 18px box the lift of the hover reads as the border swelling. It keeps its rest.
			{
				variant: 'outline',
				size: ['icon-xs', 'icon-2xs'],
				class: 'data-hovered:not-data-pressed:shadow-control'
			}
		],
		defaultVariants: {
			variant: 'default',
			size: 'default',
			iconed: false,
			counted: false
		}
	});

	/** The count that ends a button: quieter than the label, in the ink of the variant. */
	export const buttonCountVariants = tv({
		base: 'tabular-nums',
		variants: {
			variant: {
				default: 'text-on-primary/70',
				outline: 'text-ink-subtle',
				ghost: 'text-ink-subtle',
				soft: 'text-ink-subtle',
				danger: 'text-danger-ink/70',
				'outline-danger': 'text-danger-ink/70',
				link: 'text-ink-subtle'
			}
		},
		defaultVariants: { variant: 'default' }
	});

	export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;
	export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;
</script>

<script lang="ts">
	import { Button as ButtonPrimitive } from '@human-kit/ui/button';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import type { Component, ComponentProps, Snippet } from 'svelte';

	type Props = Omit<ComponentProps<typeof ButtonPrimitive.Root>, 'children'> & {
		children?: Snippet;
		variant?: ButtonVariant;
		size?: ButtonSize;
		/**
		 * The icon that leads the label. Give it here, not first in `children`: a label led by an
		 * icon starts a step closer to its edge, and only this prop tells the button so. An icon
		 * after the label, or an icon alone, goes in `children`.
		 */
		icon?: Component<Record<string, unknown>>;
		/** How many records the action touches, at the end of the label ("Approve 12"). */
		count?: number;
	};

	let {
		variant = 'default',
		size = 'default',
		class: className,
		pending = false,
		icon: Icon,
		count,
		children,
		...restProps
	}: Props = $props();
</script>

<ButtonPrimitive.Root
	class={buttonVariants({
		variant,
		size,
		iconed: Icon !== undefined,
		counted: count !== undefined,
		class: className
	})}
	{pending}
	{...restProps}
>
	{#if children || Icon}
		<!-- While pending, the label stays in the layout and in the accessible name. Only its
		     paint goes away. -->
		<span
			class={variant === 'link' ? 'contents' : 'inline-flex min-w-0 items-center gap-[inherit]'}
			class:invisible={pending}
		>
			{#if Icon}
				<Icon />
			{/if}
			{@render children?.()}
			{#if count !== undefined}
				<span class={buttonCountVariants({ variant })}>{count}</span>
			{/if}
		</span>
	{/if}
	{#if pending}
		<span class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
			<LoaderCircle class="animate-spin motion-reduce:animate-none" />
		</span>
	{/if}
</ButtonPrimitive.Root>
