<script lang="ts">
    export let label: string;
    export let methods: Record<Sort, string>;
    export let disabled: boolean;
    export let onChange: (method: Sort) => () => void;
</script>

<form>
    <fieldset disabled={disabled}>
        <label for="sort">Sortera på {label}</label>
        {#each Object.entries(sortingMethods) as [method, methodLabel], index}
            <input
                type="radio"
                name="sort"
                value={method}
                id={method}
                checked={index === 0}
                on:change={onChange(method)}
            />
            <label for={method}>{methodLabel}</label>
        {/each}
    </fieldset>
</form>

<style>
	fieldset {
		display: flex;
		align-items: center;
		justify-content: end;
	}

	label[for="sort"]::after {
		content: ":";
		margin-right: var(--spacing-xs);
	}

	label {
		cursor: pointer;
	}

	input[type="radio"] + label {
		display: inline-flex;
		align-items: center;
		padding: 0 var(--spacing-xs);
		height: var(--spacing-l);
		border-radius: var(--border-radius-s);

		background-color: var(--color-negative);
	}

	input[type="radio"]:checked + label {
		background-color: var(--color-foreground);
		color: var(--color-negative);
	}
</style>