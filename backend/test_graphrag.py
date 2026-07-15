from pipeline import graphrag


def test_graphrag_returns_dict_payload():
    question = "Why might a patient with excessive thirst receive insulin?"
    result = graphrag(question)

    assert isinstance(result, dict)
    assert "answer" in result
    assert isinstance(result["answer"], str)