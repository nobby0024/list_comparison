Two List files comparison tool
====
This is a very simple tool that you can compare the contents of two list files.

you can extract lines contained only in one side, or extract / delete lines included in both. 

These process are executed only by client side javascript, so you don't have to worry about handling confidential information.

## Demo
[demonstration page](https://nobby0024.github.io/list_comparison/)

## Example
#### list A
```
AAA  
bbb  
CCC  
ABC  
1111  
hoge  
```

#### list B
```
hoge  
DDD  
CCC  
AAA
```  

### -> You can download following.
#### a unique list included in both A and B
```
AAA
CCC
hoge
```

#### a unique list included in either A or B
```
AAA
bbb
CCC
ABC
1111
hoge
```

#### a unique list included in only A
```
bbb
ABC
1111
```

#### a unique list included in only B
```
DDD
```
