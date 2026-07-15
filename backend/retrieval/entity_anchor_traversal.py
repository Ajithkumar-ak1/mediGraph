from graph import get_neighbor_paths
from retrieval.path_ranker import RELATION_WEIGHTS
from retrieval.similarity import cosine_similarity
import numpy as np


class EntityAnchorTraversal:

    def __init__(
        self,
        query_embedding,
        entity_scores,
        relation_weights,
        max_hops=4,
        beam_width=5
    ):

        self.query_embedding = query_embedding
        self.entity_scores = entity_scores
        self.relation_weights = relation_weights
        self.max_hops = max_hops
        self.beam_width = beam_width

    def traverse(self, anchor_entities):

        frontier = []

        # Initialize paths from anchor entities
        for entity in anchor_entities:
            frontier.append({
                "current": entity["name"],
                "nodes": [entity["name"]],
                "triples": [],
                "score": entity["score"]
            })

        completed_paths = []

        for hop in range(self.max_hops):

            # print(f"\n========== Hop {hop+1} ==========")

            next_frontier = []

            for state in frontier:

                neighbors = get_neighbor_paths(state["current"])

                for candidate in neighbors:

                    neighbor = candidate["neighbor"]

                    neighbor_name = neighbor["name"]

                    # avoid cycles
                    if neighbor_name in state["nodes"]:
                        continue

                    similarity = cosine_similarity(
                        self.query_embedding,
                        np.array(candidate["embedding"])
                    )

                    relation = candidate["relation"]

                    relation_weight = self.relation_weights.get(
                        relation,
                        0.5
                    )

                    anchor_score = self.entity_scores.get(
                        neighbor_name,
                        0
                    )

                    step_score = (
                        0.5 * similarity +
                        0.3 * relation_weight +
                        0.2 * anchor_score
                    )

                    new_state = {
                        "current": neighbor_name,
                        "nodes": state["nodes"] + [neighbor_name],
                        "triples": state["triples"] + [{
                        "source": candidate["start"],
                        "relation": relation,
                        "target": candidate["end"]
                    }],
                        "score": state["score"] + step_score
                    }

                    next_frontier.append(new_state)

            if not next_frontier:
                break

            next_frontier.sort(
                key=lambda x: x["score"],
                reverse=True
            )

            frontier = next_frontier[:self.beam_width]

            completed_paths.extend(frontier)

        completed_paths.sort(
            key=lambda x: x["score"],
            reverse=True
        )

        return completed_paths[:self.beam_width]