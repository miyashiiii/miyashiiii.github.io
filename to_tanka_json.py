text="""

"""

lines = text.strip().split("\n")

tags = ["育児"]
tankas = []
for line in lines:
    if not line:
        continue
    tankas.append({"tanka": line,"tags":tags})

print(tankas)