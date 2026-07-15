from embedding.model import get_embedding
from retrieval.vector_search import vector_search
from retrieval.evidence_builder import build_evidence
from retrieval.entity_anchor_traversal import EntityAnchorTraversal
from retrieval.context_builder import build_context
from retrieval.entity_anchor_traversal import EntityAnchorTraversal
from retrieval.reasoning import ReasoningBuilder
from retrieval.query_intent import get_relation_weights

from llm import generate_answer


def graphrag(question):

    embedding = get_embedding(question)


    
    results = vector_search(
        embedding,
        top_k=10
    )
    # print("\n========== Vector Search Results ==========")
    # print(results)

    
    entity_scores = {
        r["name"]: r["score"]
        for r in results
    }

    
    relation_weights = get_relation_weights(question)

    traversal = EntityAnchorTraversal(
        query_embedding=embedding,
        entity_scores=entity_scores,
        relation_weights=relation_weights,
        max_hops=4,
        beam_width=5
    )

    ranked_paths = traversal.traverse(results)
    # 5. Reasoning Chain

    reasoning_builder = ReasoningBuilder()


    triples = reasoning_builder.extract_triples(
        ranked_paths
    )

    triples = reasoning_builder.remove_duplicates(
        triples
    )


    groups = reasoning_builder.group_triples(
        triples
    )


    context = reasoning_builder.build_chain(
        groups
    )


    # print("\n========== Reasoning Context ==========")
    # print(context)
    # print("======================================")
    # 7. LLM
    answer = generate_answer(
        question,
        context
    )


    # Evidence for UI
    evidence = [
        f"{t['source']} {t['relation']} {t['target']}"
        for t in triples
    ]


    # Paths for UI visualization
    paths = ranked_paths


    # Reasoning chain
    reasoning = context


    return {
        "answer": answer,
        "reasoning": reasoning,
        "evidence": evidence,
        "paths": paths
    }