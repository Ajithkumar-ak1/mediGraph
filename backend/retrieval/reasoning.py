class ReasoningBuilder:

    def __init__(self):
        pass

    def extract_triples(self, paths):
        """
        Extract all triples from complete traversal paths.
        """

        triples = []

        for path in paths:
            triples.extend(path["triples"])

        return triples

    def remove_duplicates(self, triples):

        unique = []
        seen = set()

        for triple in triples:

            key = (
                triple["source"],
                triple["relation"],
                triple["target"]
            )

            if key not in seen:
                seen.add(key)
                unique.append(triple)

        return unique

    def group_triples(self, triples):

        groups = []
        visited = set()

        for i, triple in enumerate(triples):

            if i in visited:
                continue

            queue = [i]
            visited.add(i)

            group = []

            while queue:

                idx = queue.pop()

                current = triples[idx]

                group.append(current)

                current_entities = {
                    current["source"],
                    current["target"]
                }

                for j, other in enumerate(triples):

                    if j in visited:
                        continue

                    other_entities = {
                        other["source"],
                        other["target"]
                    }

                    if current_entities.intersection(other_entities):

                        queue.append(j)
                        visited.add(j)

            groups.append(group)

        return groups

    def build_chain(self, groups):

        chains = []

        for group in groups:

            lines = []
            entities = set()

            for triple in group:

                source = triple["source"]
                relation = triple["relation"].replace("_", " ").lower()
                target = triple["target"]

                entities.add(source)
                entities.add(target)

                lines.append(
                    f"- {source} {relation} {target}."
                )

            chain = [
                "Connected reasoning chain:"
            ]

            chain.extend(lines)

            chain.append(
                f"\nShared entities: {', '.join(sorted(entities))}"
            )

            chains.append("\n".join(chain))

        return "\n\n".join(chains)