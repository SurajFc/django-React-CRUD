from django.core.management.base import BaseCommand
from faker import Faker
from ...models import Employee
import random


class Command(BaseCommand):
    help = "Command info"

    def handle(self, *args, **kwargs):
        print("Generating Fake Data")

        fake = Faker(['en'])
        for _ in range(100):
            Employee.objects.create(firstname=fake.first_name(),
                                    lastname=fake.last_name(),
                                    email=fake.email(),
                                    address=fake.address(),
                                    dob=fake.date(),
                                    company=fake.company(),
                                    created_at=fake.date(),
                                    mobile=str(fake.phone_number()),
                                    city=fake.city()

                                    )
            print(f"{_} fake data created")
        print("allDone")
