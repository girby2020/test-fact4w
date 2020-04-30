#######################################
# 4 ways to get factorial

n=6 
print("====1====loop-range=>=loop-in list====")
lst=[]
for i in range(1,n+1):
    print(i)
    lst.append(i)
print(lst)
x=1
for j in lst:
    x=x*j
print(x)

print("=========2===func======recursion=========")
#---------------------------------function----
def fact1(nn):
    if nn==1 or nn==0:
        return 1
    else:
        return nn*fact1(nn-1)
fact_obj=fact1(n)
print(fact_obj)
print("==============single line func=====3===recursion=========")
#------------------# single line to find factorial -----
def factorial(m): 
    return 1 if (m==1 or m==0) else m * factorial(m - 1);  
print(    factorial(n)   )
print("=======4=======while==================")
#------------------------------while----
fact = 1
while(n > 1): 
    fact *= n 
    n -= 1
print(fact)