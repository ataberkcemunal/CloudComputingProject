from locust import HttpUser, task, between
import random

class MarkdownUser(HttpUser):
    wait_time = between(1, 3)
    
    def on_start(self):
        # Her kullanıcı başlangıçta yeni bir belge oluşturur
        self.document_id = f"test-doc-{random.randint(1000, 9999)}"
        self.client.post(f"/api/documents/{self.document_id}", json={"content": "# Test Document"})
    
    @task(3)
    def read_document(self):
        # Belgeyi okuma
        self.client.get(f"/api/documents/{self.document_id}")
    
    @task(2)
    def update_document(self):
        # Belgeyi güncelleme
        content = f"# Test Document\n\nUpdated at {random.randint(1, 1000)}"
        self.client.put(f"/api/documents/{self.document_id}", json={"content": content})
    
    @task(1)
    def list_documents(self):
        # Tüm belgeleri listeleme
        self.client.get("/api/documents") 