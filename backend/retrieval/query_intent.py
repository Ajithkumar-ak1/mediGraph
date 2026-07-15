from retrieval.path_ranker import RELATION_WEIGHTS


def get_relation_weights(question: str):

    weights = RELATION_WEIGHTS.copy()

    q = question.lower()

    # Symptom-related questions
    if any(word in q for word in [
        "symptom",
        "symptoms",
        "sign",
        "signs"
    ]):
        weights["HAS_SYMPTOM"] += 1.5

    # Treatment-related questions
    if any(word in q for word in [
        "treat",
        "treatment",
        "medicine",
        "drug",
        "prescribe",
        "therapy"
    ]):
        weights["TREATS"] += 1.5
        weights["USED_FOR"] += 1.0

    # Doctor / specialist questions
    if any(word in q for word in [
        "doctor",
        "specialist",
        "physician",
        "endocrinologist"
    ]):
        weights["SPECIALIZES_IN"] += 1.5

    # Organ questions
    if any(word in q for word in [
        "organ",
        "affect",
        "affected",
        "body part"
    ]):
        weights["AFFECTS"] += 1.5

    # Type/classification
    if any(word in q for word in [
        "type",
        "kind",
        "category",
        "is a"
    ]):
        weights["IS_A"] += 1.5

    return weights