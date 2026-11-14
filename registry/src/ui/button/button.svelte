<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: [
			'relative inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap select-none',
			'transition-[color,background-color,border-color,opacity] outline-hidden',
			// The ring follows `data-focus-visible`, not `:focus-visible`: the primitive also
			// shows it when the focus comes back from an overlay after a key press.
			'data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-ring data-focus-visible:outline-solid',
			'data-disabled:pointer-events-none data-disabled:opacity-50 data-pending:cursor-progress',
			'[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
		],
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground data-hovered:bg-primary/90 data-pressed:bg-primary/80',
				secondary:
					'bg-secondary text-secondary-foreground data-hovered:bg-secondary/80 data-pressed:bg-secondary/70',
				outline:
					'border bg-background data-hovered:bg-accent data-hovered:text-accent-foreground data-pressed:bg-accent/80',
				ghost:
					'data-hovered:bg-accent data-hovered:text-accent-foreground data-pressed:bg-accent/80',
				destructive:
					'bg-destructive text-destructive-foreground data-hovered:bg-destructive/90 data-pressed:bg-destructive/80',
				link: 'text-foreground underline-offset-4 data-hovered:underline'
			},
			size: {
				sm: 'h-8 gap-1.5 px-3 text-xs [&_svg]:size-3.5',
				default: 'h-9 px-4',
				lg: 'h-10 px-6',
				icon: 'size-9',
				'icon-sm': 'size-8 [&_svg]:size-3.5'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
</script>

<script lang="ts">
	import { Button as ButtonPrimitive } from '@human-kit/ui/button';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = Omit<ComponentProps<typeof ButtonPrimitive.Root>, 'children'> & {
		children?: Snippet;
		variant?: ButtonVariant;
		size?: ButtonSize;
	};

	let {
		variant = 'default',
		size = 'default',
		class: className,
		pending = false,
		children,
		...restProps
	}: Props = $props();
</script>

<ButtonPrimitive.Root
	class={buttonVariants({ variant, size, class: className })}
	{pending}
	{...restProps}
>
	{#if pending}
		<!-- The label stays in the layout and in the accessible name. Only its paint goes away. -->
		<span class="invisible contents">{@render children?.()}</span>
		<span class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
			<LoaderCircle class="animate-spin motion-reduce:animate-none" />
		</span>
	{:else}
		{@render children?.()}
	{/if}
</ButtonPrimitive.Root>
