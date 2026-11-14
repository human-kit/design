<script lang="ts">
	import {
		Breadcrumbs,
		BreadcrumbsEllipsis,
		BreadcrumbsItem,
		BreadcrumbsLink,
		BreadcrumbsList,
		BreadcrumbsSeparator
	} from '@registry/ui/breadcrumbs';

	const trail = ['Clinics', 'North clinic', 'Laboratory', 'Embryology', 'Cycle 2'];
</script>

<Breadcrumbs maxItems={3}>
	<BreadcrumbsList>
		{#each trail as page, index (page)}
			<BreadcrumbsItem>
				{#if index === trail.length - 1}
					<BreadcrumbsLink current>{page}</BreadcrumbsLink>
				{:else}
					<BreadcrumbsLink href="#{index}">{page}</BreadcrumbsLink>
					<BreadcrumbsSeparator />
				{/if}
			</BreadcrumbsItem>
			{#if index === 0}<BreadcrumbsEllipsis />{/if}
		{/each}
	</BreadcrumbsList>
</Breadcrumbs>
