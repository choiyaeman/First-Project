<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>회원 가입 페이지</title>
</head>
<body>

    <h2>회원 정보 입력</h2>
	<form action="joinStep2" method="post"><!-- joinStep1로 파라미터가 넘어간다 -->
		<p>
			<label>ID:</label><br/>
			<input type="text" name="id" id="id"/>
		</p>
		<p>
			<label>PASSWORD:</label><br/>
			<input type="password" name="password" id="password"/>
		</p>
		<p>
			<label>CONFIRM PASSWORD:</label><br/>
			<input type="password" name="confirmPassword" id="confirmPassword"/>
		</p>
		<p>
			<label>NAME:</label><br/>
			<input type="text" name="name" id="name"/>
		</p>
		<p>
			<label>전화번호: XXX-XXXX-XXXX의 형태로 입력하세요.</label><br/>
			<input type="text" name="phone" id="phone"/>
		</p>
		
		
		<input type="submit" value="확인"/>
		
	</form>
</body>
</html>
