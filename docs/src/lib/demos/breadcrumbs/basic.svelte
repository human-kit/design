<script lang="ts">
	import {
		Breadcrumbs,
		BreadcrumbsItem,
		BreadcrumbsLink,
		BreadcrumbsList,
		BreadcrumbsSeparator
	} from '@registry/ui/breadcrumbs';
</script>

<Breadcrumbs>
	<BreadcrumbsList>
		<BreadcrumbsItem>
			<BreadcrumbsLink href="#patients">Patients</BreadcrumbsLink>
			<BreadcrumbsSeparator />
		</BreadcrumbsItem>
		<BreadcrumbsItem>
			<BreadcrumbsLink href="#ana">Ana María Ruiz</BreadcrumbsLink>
			<BreadcrumbsSeparator />
		</BreadcrumbsItem>
		<BreadcrumbsItem>
			<BreadcrumbsLink current>Treatment cycle 2</BreadcrumbsLink>
		</BreadcrumbsItem>
	</BreadcrumbsList>
</Breadcrumbs>
